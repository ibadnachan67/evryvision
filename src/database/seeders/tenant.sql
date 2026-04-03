
INSERT INTO public.tenants (id, name, slug, domain, theme, features, created_at)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Acme Corp',
    'acme',
    'acme.example.com',
    '{"primaryColor":"#1f6feb","logo":"acme-logo"}'::jsonb,
    '{"billing":false,"analytics":true}'::jsonb,
    NOW()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Globex',
    'globex',
    'globex.example.com',
    '{"primaryColor":"#f97316","logo":"globex-logo"}'::jsonb,
    '{"billing":false,"analytics":true}'::jsonb,
    NOW()
  );

INSERT INTO public.users (id, tenant_id, email, password_hash, role, created_at)
VALUES
  (
    '99999999-9999-9999-9999-999999999999',
    '11111111-1111-1111-1111-111111111111',
    'superadmin@platform.example.com',
    '$2b$12$examplehashforsuperadmin',
    'super_admin',
    NOW()
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'admin@acme.example.com',
    '$2b$12$examplehashforadminuser',
    'admin',
    NOW()
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    'agent@acme.example.com',
    '$2b$12$examplehashforagentuser',
    'agent',
    NOW()
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '22222222-2222-2222-2222-222222222222',
    'admin@globex.example.com',
    '$2b$12$examplehashforglobexadmin',
    'admin',
    NOW()
  );

INSERT INTO public.domains (id, tenant_id, domain)
VALUES
  (
    'd1111111-1111-4111-8111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'app.acme.example.com'
  ),
  (
    'd2222222-2222-4222-8222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    'app.globex.example.com'
  );

INSERT INTO public.subscriptions (id, tenant_id, plan, status, current_period_end)
VALUES
  (
    '51111111-1111-4111-8111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'pro',
    'active',
    NOW() + INTERVAL '30 days'
  ),
  (
    '52222222-2222-4222-8222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    'starter',
    'trialing',
    NOW() + INTERVAL '14 days'
  );
