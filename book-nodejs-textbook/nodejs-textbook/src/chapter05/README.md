# Chapter05. 패키지 매니저

➕

## 📌 5.1 npm 알아보기

- npm은 Node Package Manager의 약어로, 이름 그대로 노드 패키지 매니저입니다.
- 대부분의 자바스크립트 프로그램은 패키지라는 이름으로 npm에 등록되어 있으므로 특정 기능을 하는 패키지가 필요하다면 npm에서 찾아 설치하면 됩니다.
- npm에 업로드된 노드 모듈을 패키지라고 부릅니다.
- 모듈이 다른 모듈을 사용할 수 있는 것처럼, 패키지가 다른 패키지를 사용할 수도 있습니다. 이런 관계를 의존 관계라고 부릅니다.

## 📌 5.2 package.json 으로 패키지 관리하기

- 설치한 패키지의 버전을 관리하는 파일이 package.json 입니다.
- npm init 명령어로 package.json 을 생성할 수 있습니다.

  ```Shell
  npm init
  This utility will walk you through creating a package.json file.
  It only covers the most common items, and tries to guess sensible defaults.

  See `npm help init` for definitive documentation on these fields
  and exactly what they do.

  Use `npm install <pkg>` afterwards to install a package and
  save it as a dependency in the package.json file.

  Press ^C at any time to quit.
  package name: (chapter05)
  version: (1.0.0)
  description:
  entry point: (index.js)
  test command:
  git repository:
  keywords:
  author:
  license: (ISC)
  About to write to /Users/haeny/dev/workspace/TIL/book/nodejs-textbook/src/chapter05/package.json:

  {
    "name": "chapter05",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
  }

  Is this OK? (yes)
  ```

  - package name
    - 패키지의 이름입니다. package.json 의 name 속성에 저장됩니다.
  - version
    - 패키지의 버전입니다. npm의 버전은 다소 엄격하게 관리됩니다.
  - entry point
    - 자바스크립트 실행 파일 진입점입니다.
    - 보통 마지막으로 module.exports 를 하는 파일을 지정합니다.
    - package.json 의 main 속성에 저장됩니다.
  - test command
    - 코드를 테스트할 때 입력할 명령어를 의미합니다.
    - package.json scripts 속성 안의 test 속성에 저장됩니다.
  - git repository
    - 코드를 저장해둔 Git 저장소 주소를 의미합니다.
    - 나중에 소스에 문제가 생겼을 때 사용자들이 이 저장소에 방문해 문제를 제기할 수도 있고, 코드 수정본을 올릴 수도 있습니다.
    - package.json 의 repository 속성에 저장됩니다.
  - keywords
    - 키워드는 npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있도록 해줍니다.
    - package.json 의 keywords 속성에 저장됩니다.
  - license
    - 해당 패키지의 라이센스를 넣으면 됩니다.

- 라이센스

  - 오픈 소스라고 해서 모든 패키지를 아무런 제약 없이 사용할 수 있는 것은 아닙니다.
  - 라이센스별로 제한 사항이 있으므로 설치 전에 라이센스를 확인해야 합니다.

- `npm install [패키지명]` 으로 패키지를 설치할 수 있습니다.

  - package.json 의 dependencies 속성에 저장됩니다.
  - `--save` 명령어를 붙이는 경우도 있는데 npm@5 부터는 기본값으로 설정되어 있으므로 따로 붙이지 않아도 됩니다.
  - 여러개를 설치 시에는 `npm install [패키지1] [패키지2] ...` 와 같이 나열하면 됩니다.
  - npm install 명령어는 npm i 로 줄여 쓸 수 있습니다.

- 개발용 패키지를 설치할 수도 있습니다.

  - 실제 배포 시에는 사용되지 않고 개발 중에만 사용되는 패키지들입니다.
  - `npm install --save-dev [패키지명] ...` 로 설치합니다.
  - package.json 의 devDependencies 속성에 저장됩니다.
  - --save-dev 옵션은 -D 로 줄여 써도 됩니다.

- npm 에는 전역(global) 설치라는 옵션도 있습니다.
  - 패키지를 현재 폴더의 node_modules에 설치하는 것이 아니라 npm이 설치되어 있는 폴더에 설치합니다.
  - 이 폴더의 경로는 보통 시스템 환경 변수에 등록되어 있으므로 전역 설치한 패키지는 콘솔의 명령어로 사용할 수 있습니다.
  - --global 옵션은 -g 로 줄여 써도 됩니다.

## 📌 5.3 패키지 버전 이해하기

- 노드 패키지들의 버전은 항상 세 자리로 이루어져 있습니다. 세 자리인 이유는 SemVer 방식의 버전 넘버링을 따르기 때문입니다.
- SemVer는 Semantic Versioning(유의적 버전)의 약어입니다. 버전을 구성하는 세 자리가 모두 의미를 가지고 있다는 뜻입니다.
  - 버전의 첫 번째 자리는 major 버전입니다.
    - major 버전이 0이면 초기 개발 중이라는 뜻입니다. 1부터는 정식 버전을 의미합니다.
    - major 버전은 하위 호환이 안 될 정도로 패키지의 내용이 수정되었을 때 올립니다.
    - 예를 들어, 1.5.0 버전 패키지를 사용하고 있던 사람들이 2.0.0 으로 업데이트했을 때 에러가 발생할 확률이 크다는 뜻입니다.
  - 두 번째 자리는 minor 버전입니다.
    - minor 버전은 하위 호환이 되는 기능 업데이트를 할 때 올립니다.
    - 예를 들어, 1.5.0 버전 패키지 사용자가 1.6.0 으로 업데이트 했을 때 아무 문제가 없어야 합니다.
  - 세 번째 자리는 patch 버전입니다.
    - 새로운 기능이 추가되었다기보다 기존 기능에 문제가 있어 수정한 것을 내놓았을 때 patch 버전을 올립니다.
- package.json 에는 SemVer 식 세 자리 버전 외에도 버전 앞에 ^ 이나 ~ 또는 >, < 같은 문자가 붙어있습니다.
  - ^ 기호
    - minor 버전까지만 설치하거나 업데이트 합니다.
    - 예를 들어, npm i express@^1.1.1 이라면 1.1.1 이상부터 2.0.0 미만 버전까지만 설치됩니다.
  - ~ 기호
    - patch 버전까지만 설치하거나 업데이트 합니다.
    - 예를 들어, npm i express@~1.1.1 이라면 1.1.1 이상부터 1.2.0 미만 버전까지만 설치됩니다.
  - \> , <, >=, <=, = 은 알기 쉽게 초과, 미만, 이상, 이하, 동일을 뜻합니다.
    - 예를 들어, npm i express@>1.1.1 이라면 1.1.1 버전보다 높은 버전이 설치됩니다.
  - @latest
    - 안정된 최신 버전 패키지를 설치합니다.
    - npm install express@latest
  - @next
    - 가장 최근 배포판을 사용할 수 있습니다.
    - @latest 와 다른 점은 안정되지 않은 알파나 베타 버전의 패키지를 설치할 수 있다는 것입니다.
    - 알파나 베타 버전은 1.1.1-alpha.0 이나 2.0.0-beta.1 처럼 표시합니다.
    - 출시 직전의 패키지에는 2.0.0-rc.0 처럼 rc(Release Candidate)가 붙는 경우도 있습니다.

## 📌 5.4 기타 npm 명령어

- npm outdated

  - 설치한 패키지 중 업데이트할 수 있는 패키지가 있는지 확인할 수 있습니다.

    ```PowerShell
    Package       Current    Wanted  Latest  Location                  Depended by
    @types/node  16.11.17  16.11.17  17.0.5  node_modules/@types/node  nodejs-textbook
    eslint          8.5.0     8.6.0   8.6.0  node_modules/eslint       nodejs-textbook
    ```

  - Current 와 Wanted가 다르다면 업데이트가 필요한 경우입니다.

- npm update [패키지명]

  - 해당 패키지를 Wanted에 적힌 버전으로 업데이트 됩니다.
  - npm update 를 하면 업데이트 가능한 모든 패키지가 Wanted에 적힌 버전으로 업데이트됩니다.

- npm uninstall [패키지명]

  - 해당 패키지를 제거하는 명령어입니다.
  - npm rm [패키지명] 으로 줄여 쓸 수도 있습니다.

- npm search [검색어]

  - npm의 패키지를 검색할 수 있습니다.

- npm info [패키지명]

  - 패키지의 세부 정보를 파악하고자 할 때 사용하는 명령어입니다.
  - package.json의 내용과 의존 관게, 설치 가능한 버전 정보 등이 표시됩니다.

- npm adduser

  - npm 로그인을 위한 명령어입니다.
  - 나중에 패키지를 배포할 때 로그인이 필요합니다.

- npm whoami

  - 로그인한 사용자가 누구인지 알립니다.
  - 로그인된 상태가 아니라면 에러가 발생합니다.

- npm logout

  - npm adduser로 로그인한 계정을 로그아웃할 때 사용합니다.

- npm version [버전]

  - package.json의 버전을 올립니다.
  - 원하는 버전의 숫자를 넣을 수도 있고, major, minor, patch 라는 문자열을 넣어 해당 부분의 숫자를 1씩 올릴 수도 있습니다.

- npm deprecate [패키지명][버전][메시지]

  - 해당 패키지를 설치할 때 경고 메시지를 띄우게 하는 명령어입니다.
  - 자신의 패키지에만 이 명령어를 적용할 수 있습니다.
  - deprecated 처리를 해두면 다른 사용자들이 버그가 있는 버전의 패키지를 설치할 때 경고 메시지가 출력됩니다.

- npm publish

  - 자신이 만든 패키지를 배포할 때 사용합니다.

- npm unpublish

  - 배포한 패키지를 제거할 때 사용합니다. 24시간 이내에 배포한 패키지만 제거할 수 있습니다.
  - 이러한 제약이 있는 이유는 의존성 관계 때문입니다. 다른 사람이 사용하고 있는 패키지를 제거하는 경우를 막기 위해서입니다.

- npm ci
  - package.json 대신 package-lock.json에 기반하여 패키지를 설치합니다.
  - 더 엄격하게 버전을 통제하여 패키지를 설치하고 싶을 때 사용하면 됩니다.
