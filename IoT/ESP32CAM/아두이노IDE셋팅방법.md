# 아두이노 IDE 초기 셋팅
1. Tools -> Board -> esp32 -> AI Thinker ESP32-CAM 선택
2. Tools -> Port 에서 USB 부분과 연결된 포트 선택
3. Tools -> Flash Mode -> DIO
4. Tools -> Partition Schema -> Huge APP
5. File -> Preferences 에서 Additional boards manager URLs 에 다음을 기입한다.
```
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```
6. 코드에서 와이파이 이름, 비밀번호, 서버 주소, serverPath, 포트번호가 알맞는지 확인 한다.

7. 우측 상단에 Serial Monitor 아이콘을 클릭한 뒤, 나오는 콘솔에서 우측 상단에 baud 를 코드에서 기입한 baud 와 일치하게 넣어준다.  
현재 코드에서는 115200(54번째줄)

7. ESP32 모듈에서 IOO 버튼을 누른 상태에서 RST 버튼을 누른다.
그러면, Serial Monitor 부분에 "waiting for download" 라는 문구가 뜬다.

8. 좌측 상단의 -> 아이콘(Upload) 을 눌러서 코드를 모듈에 업로드 한다.
> 만약 실행했는데 Serial Monitor 에 모듈 관련 에러가 발생한다면 RST 버튼을 눌러서 리셋을 시도한다.