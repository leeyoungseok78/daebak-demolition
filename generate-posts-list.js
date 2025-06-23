const fs = require('fs');
const path = require('path');

// posts 폴더 경로
const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'posts-list.json');

console.log('📁 Posts 디렉토리:', postsDir);
console.log('📄 출력 파일:', outputFile);

try {
    // posts 폴더 존재 확인
    if (!fs.existsSync(postsDir)) {
        console.error('❌ posts 폴더가 존재하지 않습니다:', postsDir);
        process.exit(1);
    }

    // posts 폴더의 모든 파일 읽기
    const files = fs.readdirSync(postsDir);
    console.log('📂 발견된 모든 파일:', files);
    
    // .md 파일만 필터링
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    console.log('📝 마크다운 파일들:', markdownFiles);
    
    // 파일 정보 수집
    const posts = markdownFiles.map(filename => {
        const filePath = path.join(postsDir, filename);
        const stats = fs.statSync(filePath);
        
        console.log(`📄 ${filename}: 생성됨=${stats.birthtime}, 수정됨=${stats.mtime}`);
        
        return {
            filename: filename,
            created: stats.birthtime,
            modified: stats.mtime
        };
    });
    
    // 수정일시 기준으로 최신순 정렬
    posts.sort((a, b) => new Date(b.modified) - new Date(a.modified));
    
    // JSON 파일로 저장
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), 'utf8');
    
    console.log(`✅ ${posts.length}개의 포스트가 포함된 목록을 생성했습니다.`);
    console.log('📋 생성된 포스트 목록:');
    posts.forEach((post, index) => {
        console.log(`  ${index + 1}. ${post.filename}`);
    });
    
} catch (error) {
    console.error('❌ 포스트 목록 생성 중 오류 발생:', error);
    process.exit(1);
} 