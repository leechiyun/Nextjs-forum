export default function Write() {
  return (
    <div>
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <input type="text" id="content" name="content" />
        </div>
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
