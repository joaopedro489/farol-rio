import 'dotenv/config';

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

import { PrismaClient } from '../../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 10;
const DEFAULT_USER_EMAIL = 'tecnico@prefeitura.rio';
const DEFAULT_USER_PASSWORD = 'painel@2024';

enum AlertEnum {
  LATE_VACCINE = 'vacinas_atrasadas',
  LOW_FREQUENCY = 'frequencia_baixa',
  LATE_APPOINTMENT = 'consulta_atrasada',
  SUSPENDED_BENEFIT = 'beneficio_suspenso',
  OUTDATED_REGISTRATION = 'cadastro_desatualizado',
  PENDING_ENROLLMENT = 'matricula_pendente',
  ABSENT_REGISTRATION = 'cadastro_ausente',
}

type SeedChild = {
  id: string;
  nome: string;
  data_nascimento: string;
  bairro: string;
  responsavel: string;
  saude: {
    vacinas_em_dia: boolean;
    ultima_consulta: string;
    alertas: AlertEnum[];
  } | null;
  educacao: {
    escola: string;
    frequencia_percent: number;
    alertas: AlertEnum[];
  } | null;
  assistencia_social: {
    cad_unico: boolean;
    beneficio_ativo: boolean;
    alertas: AlertEnum[];
  } | null;
  revisado: boolean;
  revisado_por: string | null;
  revisado_em: Date | null;
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

      const health = item.saude
        ? {
            vaccinesUpToDate: item.saude.vacinas_em_dia,
            lastMedicalAppointment: item.saude.ultima_consulta
              ? new Date(item.saude.ultima_consulta)
              : null,
            alerts: item.saude.alertas,
          }
        : null;

      const education = item.educacao
        ? {
            school: item.educacao.escola,
            frequency: item.educacao.frequencia_percent,
            alerts: item.educacao.alertas,
          }
        : null;

      const social_assistance = item.assistencia_social
        ? {
            cad: item.assistencia_social.cad_unico,
            benefit: item.assistencia_social.beneficio_ativo,
            alerts: item.assistencia_social.alertas,
          }
        : null;

      const child = await prisma.child.upsert({
        where: { id: item.id },
        update: {},
        create: {
          id: item.id,
          name: item.nome,
          birthday: new Date(item.data_nascimento),
          neighborhood: item.bairro,
          responsible: item.responsavel,
          health: health || undefined,
          education: education || undefined,
          social_assistance: social_assistance || undefined,
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
