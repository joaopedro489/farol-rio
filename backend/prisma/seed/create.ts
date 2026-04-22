import 'dotenv/config';

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

import { PrismaClient } from '../../src/generated/prisma/client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 10;
const DEFAULT_USER_EMAIL = 'tecnico@prefeitura.rio';
const DEFAULT_USER_PASSWORD = 'painel@2024';

type SeedChild = {
  id: string;
  nome: string;
  data_nascimento: string;
  bairro: string;
  responsavel: string;
  saude: unknown;
  educacao: unknown;
  assistencia_social: unknown;
  revisado: boolean;
  revisado_por: string | null;
  revisado_em: string | null;
};

async function main() {
  const defaultUserId = await createUserDefault({
    email: DEFAULT_USER_EMAIL,
    password: DEFAULT_USER_PASSWORD,
  });

  const seedChildren = loadSeedData();

  await createChildren({
    seed: seedChildren,
    defaultReviewerUserId: defaultUserId,
  });
}

function loadSeedData(): SeedChild[] {
  const seedPath = resolve(__dirname, 'data', 'seed.json');
  const raw = readFileSync(seedPath, 'utf-8');
  return JSON.parse(raw) as SeedChild[];
}

async function createUserDefault({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      salt,
      hash,
    },
    select: { id: true },
  });

  console.log({ user });

  return user.id;
}

async function createChildren({
  seed,
  defaultReviewerUserId,
}: {
  seed: SeedChild[];
  defaultReviewerUserId: number;
}) {
  await Promise.all(
    seed.map(async (item) => {
      const reviewedByUserId = await resolveReviewerId({
        reviewerEmail: item.revisado_por,
        fallbackUserId: defaultReviewerUserId,
      });

      const child = await prisma.child.upsert({
        where: { id: item.id },
        update: {},
        create: {
          id: item.id,
          name: item.nome,
          birthday: new Date(item.data_nascimento),
          neighborhood: item.bairro,
          responsible: item.responsavel,
          health: item.saude as never,
          education: item.educacao as never,
          social_assistance: item.assistencia_social as never,
          reviewed: item.revisado,
          reviewed_by_user_id: item.revisado ? reviewedByUserId : null,
          reviewed_at: item.revisado_em ? new Date(item.revisado_em) : null,
        },
        select: { id: true, name: true },
      });

      console.log({ child });
    }),
  );
}

async function resolveReviewerId({
  reviewerEmail,
  fallbackUserId,
}: {
  reviewerEmail: string | null;
  fallbackUserId: number;
}) {
  if (!reviewerEmail) return fallbackUserId;

  const existing = await prisma.user.findUnique({
    where: { email: reviewerEmail },
    select: { id: true },
  });

  if (existing) return existing.id;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(DEFAULT_USER_PASSWORD, salt);

  const created = await prisma.user.create({
    data: {
      email: reviewerEmail,
      salt,
      hash,
    },
    select: { id: true },
  });

  return created.id;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
