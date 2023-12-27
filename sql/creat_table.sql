--- creat blog_post table
create table
  blog_post (
    id bigint primary key generated always as identity,
    title text,
    content text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
  );

  create table
  json_table (
    id bigint primary key generated always as identity,
    key text,
    data jsonb
  );