function mission1_1() {
  const [입력1] = arguments;
  //1-1 미션을 여기에 구현합니다
  //출력을 위해서는 아래처럼 원하는 값을 출력 사이에 입력하면 됩니다.
  출력(입력1);
}

function mission1_2() {
  const [입력1, 입력2] = arguments;
  const 더하기 = 입력1 + " " + 입력2;
  출력(더하기);
}

function mission1_3() {
  const [입력1, 입력2] = arguments;
  const 곱하기 = "곱하기 결과 입니다 -> " + (입력1 * 입력2).toFixed();
  const 나누기 = "나누기 결과 입니다 -> " + (입력1 / 입력2).toFixed();
  출력(곱하기 + 나누기);
}
