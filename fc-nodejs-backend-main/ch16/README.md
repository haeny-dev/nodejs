# Chapter16. GraphQL

### GraphQL

- Facebook 에서 2015년에 발표한 새로운 API규격입니다.
- type system을 기본적으로 갖추고 있어 REST 보다 훨씬 개발 과정이 안정적이다.
- Apollo, Prisma 등 방대하고 강력한 오픈 소스 툴들로 양질의 개발자 경험 개선을 기대할 수 있습니다.
- 쿼리의 형태가 매우 자유롭기 때문에 클라이언트 개발시 매우 편리하다

### Query

- Query는 데이터 요청에 사용됩니다.
- REST 의 GET 과 같습니다

### Mutation

- Mutation은 변경에 사용된다.
- REST의 POST, DELETE, UPDATE 등과 같습니다.

### GraphQL SDL(Schema Definition Language)

- GraphQL 은 서버에 무엇을 질의할 수 있고, 무엇을 돌려받을 수 있는지 SDL로 기술한다.
