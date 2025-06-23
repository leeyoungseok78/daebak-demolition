const fs = require('fs');
const path = require('path');

// 사용법 확인
if (process.argv.length < 3) {
    console.log('📝 사용법: node create-new-post.js "포스트 제목"');
    console.log('📝 예시: node create-new-post.js "서울 철거업체 추천"');
    process.exit(1);
}

const title = process.argv[2];
const slug = title
    .toLowerCase()
    .replace(/[^가-힣a-z0-9\s]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .trim();

const filename = `${slug}.md`;
const filepath = path.join(__dirname, 'posts', filename);

// 현재 날짜
const now = new Date();
const dateString = now.toISOString();

// 마크다운 템플릿
const template = `---
title: ${title}
date: ${dateString}
---

# ${title}

여기에 블로그 내용을 작성하세요.

## 주요 내용

- 포인트 1
- 포인트 2
- 포인트 3

## 마무리

블로그 글의 마무리 내용을 작성하세요.
`;

try {
    // 파일 생성
    fs.writeFileSync(filepath, template, 'utf8');
    console.log(`✅ 새로운 포스트가 생성되었습니다: ${filename}`);
    console.log(`📁 파일 경로: ${filepath}`);
    console.log(`📝 이제 ${filename} 파일을 편집하여 내용을 작성하세요.`);
    console.log(`🔄 작성 완료 후 'node generate-posts-list.js'를 실행하여 목록을 업데이트하세요.`);
} catch (error) {
    console.error('❌ 파일 생성 중 오류:', error);
    process.exit(1);
} 