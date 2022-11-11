-- CreateTable
CREATE TABLE "notif" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "detail" TEXT,
    "category" TEXT,
    "origin" TEXT,
    "destination" TEXT,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notif_pkey" PRIMARY KEY ("id")
);
