--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: order_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_products (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "orderId" uuid NOT NULL,
    "productId" uuid NOT NULL
);


ALTER TABLE public.order_products OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    "userId" uuid
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    price real NOT NULL,
    stock integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "roleId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: order_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_products ("createdAt", "updatedAt", "orderId", "productId") FROM stdin;
2023-12-08 13:47:26.367+08	2023-12-08 13:47:26.367+08	8d254d79-70f4-4ef6-b381-6ffd51cc8e88	96f7cea4-9f6d-485f-a0f9-b31a0785b83f
2023-12-08 13:47:26.367+08	2023-12-08 13:47:26.367+08	8d254d79-70f4-4ef6-b381-6ffd51cc8e88	d4d81342-c433-4e3c-94b7-93981019e9d0
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, "createdAt", "updatedAt", "deletedAt", "userId") FROM stdin;
8d254d79-70f4-4ef6-b381-6ffd51cc8e88	2023-12-08 13:47:26.331+08	2023-12-08 13:47:26.348+08	\N	42e06abc-c4c7-42ac-9da5-73ad74d7e83e
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, stock, "createdAt", "updatedAt", "deletedAt") FROM stdin;
76071e93-bacd-4168-b346-5781653227c2	orange	10	400	2023-12-08 11:40:47.546+08	2023-12-08 11:40:47.546+08	\N
96f7cea4-9f6d-485f-a0f9-b31a0785b83f	cup	2	295	2023-12-08 13:45:38.839+08	2023-12-08 13:47:26.361+08	\N
d4d81342-c433-4e3c-94b7-93981019e9d0	apple	8	197	2023-12-08 13:45:49.967+08	2023-12-08 13:47:26.362+08	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, "createdAt", "updatedAt") FROM stdin;
4861a7fb-5db3-4701-bf35-9a6a4a102321	customer	2023-12-08 11:40:23.066+08	2023-12-08 11:40:23.066+08
50a72b6c-a2cc-4ca9-86ce-3c8ec53190ec	manager	2023-12-08 11:40:23.067+08	2023-12-08 11:40:23.067+08
0035c96d-5378-4780-a8a4-3ff0f9af6bc8	customer	2023-12-08 11:40:33.44+08	2023-12-08 11:40:33.44+08
f1116e23-8571-473f-9bb9-1cee4f4720d8	manager	2023-12-08 11:40:33.442+08	2023-12-08 11:40:33.442+08
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles ("createdAt", "updatedAt", "roleId", "userId") FROM stdin;
2023-12-08 11:40:42.311+08	2023-12-08 11:40:42.311+08	4861a7fb-5db3-4701-bf35-9a6a4a102321	42e06abc-c4c7-42ac-9da5-73ad74d7e83e
2023-12-08 11:40:42.311+08	2023-12-08 11:40:42.311+08	50a72b6c-a2cc-4ca9-86ce-3c8ec53190ec	42e06abc-c4c7-42ac-9da5-73ad74d7e83e
2023-12-08 11:40:42.311+08	2023-12-08 11:40:42.311+08	0035c96d-5378-4780-a8a4-3ff0f9af6bc8	42e06abc-c4c7-42ac-9da5-73ad74d7e83e
2023-12-08 11:40:42.311+08	2023-12-08 11:40:42.311+08	f1116e23-8571-473f-9bb9-1cee4f4720d8	42e06abc-c4c7-42ac-9da5-73ad74d7e83e
2023-12-08 13:44:45.355+08	2023-12-08 13:44:45.355+08	4861a7fb-5db3-4701-bf35-9a6a4a102321	041e3668-e1e6-4f03-b9bf-1fc5e25e991e
2023-12-08 13:44:45.355+08	2023-12-08 13:44:45.355+08	0035c96d-5378-4780-a8a4-3ff0f9af6bc8	041e3668-e1e6-4f03-b9bf-1fc5e25e991e
2023-12-08 13:44:48.81+08	2023-12-08 13:44:48.81+08	50a72b6c-a2cc-4ca9-86ce-3c8ec53190ec	ec2b6847-0625-4465-a36d-bd8bdba54fe0
2023-12-08 13:44:48.81+08	2023-12-08 13:44:48.81+08	f1116e23-8571-473f-9bb9-1cee4f4720d8	ec2b6847-0625-4465-a36d-bd8bdba54fe0
2023-12-08 13:44:58.114+08	2023-12-08 13:44:58.114+08	4861a7fb-5db3-4701-bf35-9a6a4a102321	06452cd9-dd6f-4845-9c11-d0102a822ac4
2023-12-08 13:44:58.114+08	2023-12-08 13:44:58.114+08	0035c96d-5378-4780-a8a4-3ff0f9af6bc8	06452cd9-dd6f-4845-9c11-d0102a822ac4
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
42e06abc-c4c7-42ac-9da5-73ad74d7e83e	billyCustomerAndManager	billyCustomerAndManager@gmail.com	$2a$08$YOqSpOzuvsyJxGIi/Qhvju6r0RhMRYx.V8mZflbY.joGRNYjHWwOi	2023-12-08 11:40:42.274+08	2023-12-08 11:40:42.274+08
041e3668-e1e6-4f03-b9bf-1fc5e25e991e	billyCustomer168	billyCustomer168@gmail.com	$2a$08$GDRZm//jze/Jc0LH6E3dkel7/kNW6xV0H3vG7.lIsluIbScZ3KHzG	2023-12-08 13:44:45.181+08	2023-12-08 13:44:45.181+08
ec2b6847-0625-4465-a36d-bd8bdba54fe0	billyManager	billyManager@gmail.com	$2a$08$zfCgNvNU/lk9FsudnPZ7Y.T0hip36xMRUXeBiv/HL8BAYXjT1wvBK	2023-12-08 13:44:48.799+08	2023-12-08 13:44:48.799+08
06452cd9-dd6f-4845-9c11-d0102a822ac4	billyCustomer0800	billyCustomer0800@gmail.com	$2a$08$TtQHOINO6qoI0QZYjZsILOsDLFjJZAKcaSSl6wickNI2tEN3slk7y	2023-12-08 13:44:58.104+08	2023-12-08 13:44:58.104+08
\.


--
-- Name: order_products order_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_pkey PRIMARY KEY ("orderId", "productId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY ("roleId", "userId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: order_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX order_id_index ON public.orders USING btree (id);


--
-- Name: order_id_user_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX order_id_user_index ON public.orders USING btree (id, "userId");


--
-- Name: product_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX product_id_index ON public.products USING btree (id);


--
-- Name: role_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX role_name_index ON public.roles USING btree (name);


--
-- Name: user_email_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_email_index ON public.users USING btree (email);


--
-- Name: user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_id_index ON public.users USING btree (id);


--
-- Name: user_username_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_username_index ON public.users USING btree (username);


--
-- Name: order_products order_products_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_products order_products_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT "order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_roles user_roles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_roles user_roles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

