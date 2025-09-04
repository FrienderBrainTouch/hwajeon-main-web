# EmailJS 설정 가이드

## 1. EmailJS 계정 생성 및 설정

1. [EmailJS 웹사이트](https://www.emailjs.com/)에 접속하여 계정을 생성합니다.
2. 로그인 후 대시보드로 이동합니다.

## 2. 이메일 서비스 설정

1. **Email Services** 메뉴에서 **Add New Service** 클릭
2. 사용할 이메일 서비스 선택 (Gmail, Outlook 등)
3. 서비스 설정 완료 후 **Service ID** 복사

## 3. 이메일 템플릿 생성

1. **Email Templates** 메뉴에서 **Create New Template** 클릭
2. 템플릿 내용 작성:

```
제목: 화전마을 문의 - {{subject}}

내용:
안녕하세요,

새로운 문의가 접수되었습니다.

문의자 정보:
- 성함: {{from_name}}
- 연락처: {{from_phone}}
- 이메일: {{from_email}}
- 문의 유형: {{subject}}

문의 내용:
{{message}}

감사합니다.
```

3. 템플릿 저장 후 **Template ID** 복사

## 4. Public Key 확인

1. **Account** 메뉴에서 **API Keys** 섹션 확인
2. **Public Key** 복사

## 5. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_TO_EMAIL=your-email@example.com
```

## 6. 테스트

1. 개발 서버 재시작: `npm run dev`
2. 문의하기 페이지에서 테스트 문의 전송
3. 설정한 이메일 주소로 문의 내용이 도착하는지 확인

## 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- 실제 배포 시에는 배포 플랫폼의 환경 변수 설정에서 위 값들을 설정해야 합니다
- EmailJS는 무료 플랜에서 월 200통의 이메일 제한이 있습니다
