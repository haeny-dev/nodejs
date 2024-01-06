# Chapter17. OAuth

## OAuth
- 접근 권한 위임(delegation)을 위한 공개 표준이다.
    - 장점
        - 유저 진입장벽이 매우 낮아진다.
        - 유저가 비밀번호를 기억할 필요가 없어진다.
        - 유저 허용 여부에 따라 이메일, 프로필 사진, 닉네임 등의 기본 정보를 얻을 수 있다.

- OAuth Flow
    ```
    Facebook 
    Kakao                                           유저를 해당
    Naver      =>   Access  =>     서버 검증      =>  platformId 와 엮어서 저장
    Google          Token           |   |
    Twitter                         |   |
                                Facebook
    ...
    ```

## Passport
