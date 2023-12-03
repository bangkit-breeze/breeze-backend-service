-- CreateTable
CREATE TABLE "Article" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "description" TEXT,
    "image_url" TEXT,
    "content_url" TEXT,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);
