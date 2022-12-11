create table attachment (id bigserial not null, link varchar(255) not null, name varchar(255) not null, post bigint not null, primary key (id));
create table "group" (name varchar(255) not null, primary key (name));
create table link (id bigserial not null, link varchar(255) not null, title varchar(255) not null, group_name varchar(255) not null, primary key (id));
create table post (id bigserial not null, body varchar(255) not null, created_at timestamp(6) not null, title varchar(255) not null, group_name varchar(255) not null, primary key (id));
create table "user" (id bigserial not null, email varchar(255) not null, is_admin boolean default false not null, isu_id varchar(255) not null, middle_name varchar(255) not null, name varchar(255) not null, password varchar(255) not null, surname varchar(255) not null, group_name varchar(255) not null, primary key (id));
alter table if exists attachment add constraint FK5n0x7f4w67ximr5x6uo1yn1v9 foreign key (post) references post;
alter table if exists link add constraint FKktx1amlmed1rn6ax2rrji2dxv foreign key (group_name) references "group";
alter table if exists post add constraint FKc4u3kuucpm39arnboij6sq2xt foreign key (group_name) references "group";
alter table if exists "user" add constraint FKs5wxn1796nin8igv0rb8vate2 foreign key (group_name) references "group";
