CREATE TABLE "Users"
(
  id serial NOT NULL,
  name character varying(255),
  description character varying(255) NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  PRIMARY KEY (id)
);
