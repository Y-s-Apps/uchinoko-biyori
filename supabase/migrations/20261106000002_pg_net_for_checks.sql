-- サーバーの関数を、DB から呼んで確かめるため（Claude の作業環境からは supabase.co に直接届かないので、
-- execute_sql で net.http_get / net.http_post を使い、net._http_response で返事を見る）
create extension if not exists pg_net with schema extensions;
