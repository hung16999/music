# 1. Clone project về máy tính

git clone https://github.com/hung16999/music.git

# 2. Đi vào thư mục music

cd music

# 3. cài đặt các module

Hãy đảm bảo máy tính của bạn đã cài nodejs version 14.x trở lên

npm install

# 4. cài đặt gói json-server

npm i -g json-server

# 5. Đi vào thư mục server

cd src/server

# 6. Khởi động server chạy trên port 3333

json-server --watch db.json --port 3333

# 7. Quay lại thư mục music

cd ../..

# 8. npm start
