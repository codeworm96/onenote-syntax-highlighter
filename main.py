from flask import Flask, make_response, request
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

app = Flask(__name__)

@app.route("/api", methods=['GET', 'POST'])
def api():
    code = request.values.get('code', '')
    lexer = request.values.get('lang', 'python')
    style = 'colorful'

    formatter = HtmlFormatter(style=style,
                            linenos=False,
                            noclasses=True,
                            prestyles='margin: 0')

    html = highlight(code, get_lexer_by_name(lexer), formatter)

    response = make_response(html)
    response.headers["Content-Type"] = "text/plain"
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

if __name__ == '__main__':
    app.run()
