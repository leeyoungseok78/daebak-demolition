const fs = require('fs');
const path = require('path');

// posts 폴더 경로
const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(__dirname, 'posts-list.json');

try {
    // posts 폴더의 모든 파일 읽기
    const files = fs.readdirSync(postsDir);
    
    // .md 파일만 필터링
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // 파일 정보 수집
    const posts = markdownFiles.map(filename => {
        const filePath = path.join(postsDir, filename);
        const stats = fs.statSync(filePath);
        
        return {
            filename: filename,
            created: stats.birthtime,
            modified: stats.mtime
        };
    });
    
    // 수정일시 기준으로 최신순 정렬
    posts.sort((a, b) => new Date(b.modified) - new Date(a.modified));
    
    // JSON 파일로 저장
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    
    console.log(`Generated posts list with ${posts.length} posts`);
    console.log('Posts:', posts.map(p => p.filename));
    
} catch (error) {
    console.error('Error generating posts list:', error);
} 