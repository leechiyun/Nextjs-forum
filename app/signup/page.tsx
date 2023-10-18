export default function Write() {
  return (
    <div>
      <h4>회원 가입</h4>
      <form action="/api/post/sign-up" method="POST">
        <div>
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" name="id" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
