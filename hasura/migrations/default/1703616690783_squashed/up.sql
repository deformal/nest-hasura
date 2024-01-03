
SET check_function_bodies = false;
CREATE SCHEMA odoo;
CREATE SCHEMA products;
CREATE TABLE odoo.odoo_user (
    id integer NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id uuid NOT NULL
);
CREATE SEQUENCE odoo.odoo_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE odoo.odoo_user_id_seq OWNED BY odoo.odoo_user.id;
CREATE TABLE products.products (
    id integer NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    price bigint NOT NULL,
    discount bigint NOT NULL
);
CREATE SEQUENCE products.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE products.products_id_seq OWNED BY products.products.id;
CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
CREATE TABLE public.carts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id uuid NOT NULL
);
CREATE TABLE public.carts_products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cart_id uuid NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);
ALTER TABLE ONLY odoo.odoo_user ALTER COLUMN id SET DEFAULT nextval('odoo.odoo_user_id_seq'::regclass);
ALTER TABLE ONLY products.products ALTER COLUMN id SET DEFAULT nextval('products.products_id_seq'::regclass);
ALTER TABLE ONLY odoo.odoo_user
    ADD CONSTRAINT odoo_user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY products.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX odoo_user_user_id_key ON odoo.odoo_user USING btree (user_id);
CREATE UNIQUE INDEX products_name_key ON products.products USING btree (name);
CREATE UNIQUE INDEX carts_products_cart_id_key ON public.carts_products USING btree (cart_id);
CREATE UNIQUE INDEX carts_products_product_id_key ON public.carts_products USING btree (product_id);
CREATE UNIQUE INDEX carts_user_id_key ON public.carts USING btree (user_id);
CREATE UNIQUE INDEX users_password_key ON public.users USING btree (password);
CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);
ALTER TABLE ONLY odoo.odoo_user
    ADD CONSTRAINT odoo_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES products.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE TABLE "products"."product_type" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "products"."product_type"("value") VALUES (E'GENERAL_USE');

INSERT INTO "products"."product_type"("value") VALUES (E'KITCHEN_USE');
