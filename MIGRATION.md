# Migração para catálogo PostgreSQL

O projeto foi reunido neste repositório, com `frontend/` e `backend/`. A API original permanece na pasta externa, sem ser necessária para a execução.

## Dados importados e conferidos

| Entidade | Quantidade |
| --- | ---: |
| Jogos | 35 |
| Destaques dos jogos | 123 |
| Configurações de requisitos | 66 |
| Usuários | 0 |

A origem MongoDB foi acessada somente para leitura. Todos os campos preservados foram comparados com o destino, incluindo IDs e relações. Uma segunda execução da importação confirmou que ela não duplica os registros. Os sete jogos temporários de demonstração foram removidos após a importação real.

`price`, `desconto` e `vendido` foram retirados do modelo PostgreSQL. Os dados correspondentes continuam na origem MongoDB. Os IDs antigos continuam válidos; URLs `/produto/:id` redirecionam para `/jogos/:id`.

## Validação

- Migrations PostgreSQL aplicadas e reaplicação sem alterações pendentes.
- Build de produção e lint do frontend.
- Testes de integração com PostgreSQL: criação, consulta, gênero, edição de relações, exclusão em cascata e erros.
- Navegação, busca e filtros conferidos no navegador, incluindo layout móvel.
- Frontend, backend e PostgreSQL com healthchecks no Docker.

As dependências de execução do frontend e o backend passaram no `npm audit` após ajustes. A auditoria completa do frontend ainda informa alertas nas ferramentas de desenvolvimento (Tailwind/ESLint e dependências transitivas); resolver todos exige uma atualização separada dessas ferramentas. Isso não altera o resultado dos testes funcionais.

As credenciais estão somente nos arquivos `.env` locais, ignorados pelo Git e pelo contexto de build Docker. Os exemplos de configuração não contêm a conexão real do MongoDB.

## Limpeza após a migração

Removidas 11 imagens sem referência no código, no seed ou no banco atual; duas fontes não importadas; pastas vazias de componentes de loja e suporte; e o cache de ferramentas na raiz. Também foram retirados o tema antigo e o caminho inexistente `src/pages` da configuração Tailwind, a configuração de `next/image` (o catálogo usa imagens HTML) e a propriedade `databaseUrl` não consumida do objeto de configuração da API.

Todos os módulos de `frontend/src` e `backend/src` permanecem ligados às entradas da aplicação. As imagens referenciadas pelos dados e pelo seed, as migrations, o importador e os redirecionamentos de compatibilidade continuam necessários. A pasta externa `masterkey-game-catalog-api` é o repositório original independente; o catálogo unificado não depende dela para executar.
