-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "as" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "shopifyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "userLanguage" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_as_key" ON "Organization"("as");

-- CreateIndex
CREATE UNIQUE INDEX "Event_shopifyId_key" ON "Event"("shopifyId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
