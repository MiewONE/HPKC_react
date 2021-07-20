function TeamCreate() {
    return (
        <form action="/team/create" acceptCharset="UTF-8" method="POST">
            <input type="teamName" placeholder="팀 이름을 입력하세요" />
            <input type="subject" placeholder="주제를 입력하세요" />
            <input type="submit" name="commit" value="팀 생성" />
        </form>
    );
}

export default TeamCreate;
