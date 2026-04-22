-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "children" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "health" JSONB,
    "education" JSONB,
    "social_assistance" JSONB,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "reviewed_by_user_id" INTEGER,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "children_neighborhood_idx" ON "children"("neighborhood");

-- CreateIndex
CREATE INDEX "children_reviewed_idx" ON "children"("reviewed");

-- CreateIndex
CREATE INDEX "children_health_idx" ON "children"("health");

-- CreateIndex
CREATE INDEX "children_education_idx" ON "children"("education");

-- CreateIndex
CREATE INDEX "children_social_assistance_idx" ON "children"("social_assistance");

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_reviewed_by_user_id_fkey" FOREIGN KEY ("reviewed_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
