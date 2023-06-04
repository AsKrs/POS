import webbrowser
import time
import os

url1 = "http://localhost:3000"
url2 = "http://localhost:3000/Customer"

chrome_path = "C:/Program Files/Google/Chrome/Application/chrome.exe"  # Chrome 실행파일이 있는 경로를 입력하세요.
webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(chrome_path))

# 5초 대기
time.sleep(5)

# 번째 모니터
#webbrowser.get("chrome").open_new(url1)

# 두 번째 모니터
os.system(f"start chrome --start-fullscreen --window-position=1920 --app={url2}")
