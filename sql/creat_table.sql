--- creat blog_post table
create table
  blog_post (
    id bigint primary key generated always as identity,
    title text,
    content text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
  );

  create index authorid
  on blog_post
  using btree (author_id);

  create policy "author can insert a new post."
  on blog_post
  for insert
  to authenticated              
  with check (true);

  create policy "author can update own post."
  on blog_post
  for update
  to authenticated
  using ((select auth.uid()) = author_id);

  create policy "author can delete own post."
  on blog_post
  for delete
  to authenticated
  using ((select auth.uid()) = author_id);

  create table
  json_table (
    id bigint primary key generated always as identity,
    key text,
    data jsonb
  );

  create policy "public can select from json_table."
  on json_table
  for select       
  using(true);