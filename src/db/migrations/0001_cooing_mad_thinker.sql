ALTER TABLE "customers" ALTER COLUMN "address2" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "zip" varchar(10) NOT NULL;