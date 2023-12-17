-- CreateTable
CREATE TABLE "Project" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "description" TEXT,
    "benefits" TEXT,
    "image_url" TEXT,
    "location" TEXT,
    "price" INTEGER,
    "total_co2" INTEGER,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectParticipation" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participant_id" UUID,
    "project_id" BIGINT,

    CONSTRAINT "project_participations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectParticipation" ADD CONSTRAINT "ProjectParticipation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectParticipation" ADD CONSTRAINT "ProjectParticipation_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
