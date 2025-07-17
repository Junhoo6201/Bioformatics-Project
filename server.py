from flask import Flask, render_template
import os

app = Flask(__name__, 
    static_folder='.',
    template_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/style.css')
def style():
    return app.send_static_file('style.css')

@app.route('/app.js')
def javascript():
    return app.send_static_file('app.js')

if __name__ == '__main__':
    print("🧬 Protein Synthesis Calculator Server Starting...")
    print("Open http://localhost:8080 in your browser")
    print("Press Ctrl+C to quit")
    app.run(debug=True, host='0.0.0.0', port=8080)