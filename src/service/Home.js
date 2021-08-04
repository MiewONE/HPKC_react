import React from 'react';
import '../styles/home.scss';
import '../styles/home.css';
function Home(props) {
    const head = ['이름', '이메일', 'Git 주소'];
    const body = ['박원균', 'miewone@kakao.com', '주소'];

    return (
        <div id="homeContainer">
            <section className="pageblock homelogo">
                <img src="/img/Logo_pptogether.png" alt="logo" />
                <span>
                    #백엔드 <br />
                    #개발자 <br />
                    <br />
                    박원균 <br />
                    포트폴리오
                </span>
            </section>
            <section className="pageblock grayblock explain" id="">
                <section className="topheader">
                    <span>#소개</span>
                </section>
                <section className="header">안녕하세요 !</section>
                <section className="explanation" id="about">
                    <section>
                        <section>
                            <img src="/img/idphoto.png" alt="idphoto" />
                        </section>

                        <section>
                            <section>
                                {head.map((ele) => {
                                    return <section>{ele}</section>;
                                })}
                            </section>
                            <section>
                                {body.map((ele) => {
                                    return <section>{ele}</section>;
                                })}
                            </section>
                        </section>
                    </section>
                    <section>
                        <section style={{ marginTop: '10%' }}>
                            <br />
                            <strong>개</strong> 발에 관련된 즐거움을
                            <br />
                            <br /> <strong>발</strong> 전을 하는것에 즐거움을
                            <br />
                            <br /> <strong>자</strong> 신있게 말할 수 있습니다.
                        </section>
                    </section>
                </section>
            </section>
            <section className="pageblock explain">
                <section className="topheader">
                    <span>#소개2</span>
                </section>
                <section className="header">프로젝트 소개</section>
                <section className="explanation2">
                    <section>
                        <h1 id="-">프로젝트 이름</h1>
                        <p style={{ fontSize: '2em', fontWeight: 'bold' }}>
                            <span> PPTogether</span>
                        </p>
                        <img
                            style={{ width: '124px' }}
                            src="/img/pptogether.png"
                            alt="logo"
                        />
                    </section>
                    <section>
                        <h1 id="-">프로젝트 목적</h1>
                        <p>이 프로젝트를 구상하고 개발하게된 계기로는 </p>
                        <p>
                            저를 포함한 4명의 스터디 인원들이 모여서 공부를 하고{' '}
                        </p>
                        <p>
                            주 마다 요일을 정하여 그 주에 자신이 공부한 내용을{' '}
                        </p>
                        <p>발표를 하고 의견을 주고받으며 </p>
                        <p>
                            공부한 내용에 대해 평가를 받는 활동을
                            진행하였습니다.{' '}
                        </p>
                        <p>이 활동을 좀 더 편하고 시각적인 효과가 있는</p>
                        <p>
                            {' '}
                            화면으로 보고싶다는 생각에 만들어 활용을 하기
                            위해서입니다.
                        </p>
                    </section>
                    <section>
                        <section>
                            <h1 id="-">프로젝트 목표</h1>
                            <p>
                                취업을 목표로 백엔드에 필요한 기술들을
                                녹여보았습니다.
                            </p>
                        </section>
                        <section style={{ marginTop: '24%' }}>
                            <h1 id="-">기술</h1>
                            <ol>
                                <li>
                                    <strong>Node.Js</strong>
                                </li>
                                <li>MongoDB</li>
                                <li>Jest </li>
                                <li>Docker,Docker-compose</li>
                                <li>AWS (ECS, SNS, SQS, API Gateway 등)</li>
                            </ol>
                        </section>
                    </section>
                </section>
            </section>
            <section className="pageblock explain grayblock">
                <section className="topheader">
                    <span>#소개</span>
                </section>
                <section className="header">프로젝트 설계</section>
                <section className="explanation2">
                    <section>
                        <h2 id="-">요구사항</h2>
                        <ol>
                            <li>
                                카카오 및 Oauth 로그인 기능을 사용하여 사용자를
                                식별하기
                            </li>
                            <li>
                                팀을 만들어서 관리자 및 팀 구성원이 사용자를
                                추가,삭제,변경
                            </li>
                            <li>
                                발표에 사용했던 PPT,PDF,HWP 등 파일 자료 업로드
                            </li>
                            <li>익명 투표 기능</li>
                            <li>
                                발표 내역들을 저장하고 통계를 내어 보여주기.
                            </li>
                            <li>통계 자료를 엑셀 등 파일로 내보내기</li>
                            <li>sns에 공유하기 기능</li>
                            <li>리액트를 이용하여 프론트엔드 구현</li>
                            <li>데이터베이스 설계</li>
                            <li>JWT를 이용한 Authentication 관리</li>
                            <li>자신이 속한 팀 리스트 보여주기</li>
                            <li>팀에 관련된 멤버르 리스트 보여주기</li>
                            <li>발표 등록,삭제,수정,조회</li>
                            <li>
                                팀마다 해당하는 페이지를 공간을 만들어 줘야한다.
                            </li>
                        </ol>
                    </section>
                    <section>
                        <h3 id="-_-_">
                            상세 일정 <em>(예정)</em>
                        </h3>
                        <ol>
                            <li>
                                기획
                                <ul>
                                    <li>~ 7월 10일 : 기획 마무리</li>
                                </ul>
                            </li>
                            <li>
                                설계
                                <ul>
                                    <li>~ 7월 15일 : 설계 완료</li>
                                </ul>
                            </li>
                            <li>
                                개발
                                <ul>
                                    <li>
                                        ~ 7월 3일 : 요구사항 - 1, SNS, GOOGLE 등
                                        외부 사이트 로그인 구현
                                        <ul>
                                            <li>Kakao oAuth 로그인 구현</li>
                                            <li>
                                                존재하는 유저가 다른 oAuth를
                                                이용하여 로그인할경우 이메일을
                                                이용
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        ~ 7월 8일 : 로그인 구현과 같이 유저 정보
                                        저장{' '}
                                        <ul>
                                            <li>
                                                카카오 로그인 유저 정보 저장.
                                            </li>
                                            <li>
                                                사이트에 직접으로 계정생성한
                                                사람에 한함.( 암호화 )
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        ~ 7월 13일 : 요구사항 - 2, 구성원들
                                        CRUD와 자료 테이블 관계 완성
                                        <ul>
                                            <li>팀 생성 기능 추가</li>
                                            <li>
                                                팀과 유저를 다 대 다 관계 구성
                                            </li>
                                            <li>팀에 멤버 추가,삭제</li>
                                            <li>팀 삭제 기능 추가</li>
                                        </ul>
                                    </li>
                                    <li>
                                        ~ 7월 13일 : 요구사항 - 3, 자료 업로드
                                        기능 구현
                                        <ul>
                                            <li>자료 다운로드 기능 구현</li>
                                            <li>
                                                파일명 한글일 경우에도 다운로드
                                            </li>
                                            <li>업로드할 파일 압축하기</li>
                                            <li>
                                                압축된 파일 압축 풀면서 다운
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </section>
                    <section>
                        3. 개발
                        <ul>
                            <li>
                                ~ 7월 15일 : 요구사항 - 4, 익명 투표기능 추가
                                <ul>
                                    <li>
                                        ~ 7월 20일 : 요구사항 - 5, 통계 내역
                                        그래프를 이용 하여 보여주기
                                    </li>
                                    <li>
                                        ~ 7월 23일 : 요구사항 - 6, 요구사항 -
                                        5의 그래프를 산출물로 내보내기 기능 구현
                                    </li>
                                    <li>
                                        ~ 7월 30일 : 요구사항 - 7, SNS에
                                        공유하여 보여주기 기능 구현
                                    </li>
                                    <li>
                                        ~ 8월 20일 : 요구사항 - 8, 프론트 엔드
                                        개발 시작
                                        <ul>
                                            <li>
                                                요구사항 4 ~ 8 리액트와 같이
                                                진행 필요.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>~ 8월 25일 : 리팩토링 완료하기.</li>
                                </ul>
                            </li>
                        </ul>
                        4. 테스트
                        <ul>
                            <li>
                                ~ 7월 8일 : 로그인 로그아웃 테스트 구현 - 완료
                            </li>
                            <li>
                                ~ 7월 15일 : 개발환경 구축으로 팀 발표 테스트
                                구현 - 완료
                            </li>
                        </ul>
                        5. 배포
                    </section>
                </section>
            </section>
        </div>
    );
}

export default Home;
