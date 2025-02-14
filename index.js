import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `## Hi there 👋
<div align="center">
  <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33">🛠️ Tech Stacks</h2>
  <br />
  <div style="margin: 0 auto; text-align: center" align="center">
    <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white" />
    <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white" />
    <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" />
    <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white" />
    <img src="https://img.shields.io/badge/Spring Data JPA-F05032?style=for-the-badge&logo=Spring&logoColor=white" />
    <img src="https://img.shields.io/badge/kotlin-%230095D5.svg?&style=for-the-badge&logo=kotlin&logoColor=white" />
    <br>
    <img src="https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=Thymeleaf&logoColor=white">
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" />
    <img src="https://img.shields.io/badge/JUnit5-25A162?style=for-the-badge&logo=JUnit5&logoColor=white" />
    <br>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white" />
    <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white" />
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white" />
    <br>
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white" />
    <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jQuery&logoColor=white" />
    <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white" />
    <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white" />
    <br>
    <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
    <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white" />
  </div>
</div>
<div align="center">
  <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33">🧑‍💻 Contact me</h2>
  <br />
  <div align="center"></div>
  <br />
  <div align="center"></div>
</div>
<div align="center">
  <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33">🏅 Stats</h2>
  <div align="center"><img src="https://github-readme-stats.vercel.app/api/top-langs/?username=bsh52&layout=compact&bg_color=180,000000,&title_color=000000&text_color=000000" /></div>
</div>

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL('https://baek-dev.tistory.com/rss'); // 본인의 블로그 주소

  text += `<ul>`;

  // 날짜 변환
  function formatPubDate(pubDate) {
    const date = new Date(pubDate); // 문자열을 Date 객체로 변환

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short', // 요일 (예: 금)
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24시간 형식
      timeZone: 'Asia/Seoul' // 한국 시간 기준
    };

    return new Intl.DateTimeFormat('ko-KR', options).format(date)
        .replace(',', '') // 불필요한 콤마 제거
        .replace(/\//g, '.'); // 월/일/년을 "YYYY. MM. DD" 형식으로 변경
  }

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link, pubDate } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    console.log(`추가될 날짜: ${pubDate}`);
    text += `<li><a href='${link}' target='_blank'>${title}</a><span>${formatPubDate(pubDate)}</span></li>`;
  }

  text += `</ul>`;

  // README.md 파일 생성
  writeFileSync('README.md', text, 'utf8', (e) => {
    console.log(e);
  });
  console.log('업데이트 완료');
})();
