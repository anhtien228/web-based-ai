from flask import Flask, render_template, request, jsonify, make_response
from modules.model import summarize
import __main__

app = Flask(__name__)
# shortTokenizer = BartTokenizer.from_pretrained('sshleifer/distilbart-xsum-12-6')
# shortModel = BartForConditionalGeneration.from_pretrained('sshleifer/distilbart-xsum-12-6')

# longTokenizer = BartTokenizer.from_pretrained('sshleifer/distilbart-cnn-12-6')
# longModel = BartForConditionalGeneration.from_pretrained('sshleifer/distilbart-cnn-12-6')

@app.route('/')
def home():
    return render_template('index.html')


@app.route("/summarize", methods=["POST"])
def recommend():
    if request.method == "POST":
        # Get form data
        # request_data = request.args.get("input").get_json()
        # input_text = request_data['input_text']
        input_text = request.get_json()['input_text']
        print(input_text)

        # Call the function summarize to run the text summarization
        try:
            short_output_summary, long_output_summary = summarize(input_text)
            response = jsonify({'short': short_output_summary.strip(), 'long': long_output_summary.strip()})
            # Pass output summary to the output template
            return response

        except Exception as e:
            return render_template('index.html', query=e)

        pass

def main():
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)
    app.run()

if __name__ == '__main__':
    print("Loading BART model and tokenzier . . .")
    main()