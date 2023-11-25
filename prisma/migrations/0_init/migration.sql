-- CreateTable
CREATE TABLE "EmissionLog" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "total_emission" BIGINT,
    "category" TEXT,
    "user_id" UUID,
    "reward_exp" BIGINT,

    CONSTRAINT "emission_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_image_url" TEXT,
    "name" TEXT,
    "start_at" TIMESTAMPTZ(6),
    "end_at" TIMESTAMPTZ(6),
    "reward_points" BIGINT,
    "location" TEXT,
    "status" TEXT,
    "description" TEXT,
    "creator_id" UUID,
    "highlighted" BOOLEAN DEFAULT false,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackerCallbackLog" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response_body" JSONB,
    "emission_log_id" BIGINT,

    CONSTRAINT "tracker_callback_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT,
    "role" TEXT,
    "points" BIGINT DEFAULT 0,
    "experiences" BIGINT DEFAULT 0,
    "vehicle_emission_count" BIGINT DEFAULT 0,
    "food_emission_count" BIGINT DEFAULT 0,
    "food_footprint_sum" BIGINT DEFAULT 0,
    "vehicle_footprint_sum" BIGINT DEFAULT 0,
    "total_co2_removed" BIGINT DEFAULT 0,
    "password" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserParticipation" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participant_id" UUID,
    "stauts" TEXT,
    "description" TEXT,
    "proof_image_url" TEXT,
    "event_id" BIGINT,

    CONSTRAINT "user_participations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmissionLog" ADD CONSTRAINT "EmissionLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TrackerCallbackLog" ADD CONSTRAINT "TrackerCallbackLog_emission_log_id_fkey" FOREIGN KEY ("emission_log_id") REFERENCES "EmissionLog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserParticipation" ADD CONSTRAINT "UserParticipation_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserParticipation" ADD CONSTRAINT "UserParticipation_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

