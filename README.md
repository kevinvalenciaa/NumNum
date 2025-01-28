To run:

1. make sure you're in "python_backend" directory":

cd python_backend

2. Run the following commands:

source venv/bin/activate

python3 server.py

3. run the frontend with:

npm run dev

If the above instructions don't work:

1. when in the virtual environment, run:

pip install python-dotenv google-generativeai

pip install flask-cors

2. Run the following in the main directory:

npm install
npm install axios
