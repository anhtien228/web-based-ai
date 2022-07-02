from lib2to3.pgen2 import token
from flask import Flask, render_template, request, jsonify
from transformers import BartTokenizer, BartForConditionalGeneration
import __main__
import sys

app = Flask(__name__)
# shortTokenizer = BartTokenizer.from_pretrained('./ml/distilbart-xsum-12-6/', local_files_only=True)
# shortModel = BartForConditionalGeneration.from_pretrained('./ml/distilbart-xsum-12-6/', local_files_only=True)

# longTokenizer = BartTokenizer.from_pretrained('./ml/distilbart-cnn-12-6/', local_files_only=True)
# longModel = BartForConditionalGeneration.from_pretrained('./ml/distilbart-cnn-12-6/', local_files_only=True)

shortTokenizer = BartTokenizer.from_pretrained('sshleifer/distilbart-xsum-12-6')
shortModel = BartForConditionalGeneration.from_pretrained('sshleifer/distilbart-xsum-12-6')

longTokenizer = BartTokenizer.from_pretrained('sshleifer/distilbart-cnn-12-6')
longModel = BartForConditionalGeneration.from_pretrained('sshleifer/distilbart-cnn-12-6')

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/summarize', methods=['GET', 'POST'])
def recommend():
    if request.method == "POST":
        # Get form data
        request_data = request.get_json()
        input_text = request_data['input_text']

        # Call the function summarize to run the text summarization
        try:
            short_output_summary, long_output_summary = summarize(input_text)
            # Pass output summary to the output template
            return jsonify({'short': short_output_summary.strip(), 'long': long_output_summary.strip()})

        except Exception as e:
            return render_template('index.html', query=e)

    pass


def summarize(text, num_beams=5, length_penalty=2.0, max_length=50, min_length=15, no_repeat_ngram_size=3):
    
    text = text.replace('\n','')
    text_input_ids = shortTokenizer.encode(text, return_tensors='pt', max_length=1024, truncation=True)
    summary_ids = shortModel.generate(text_input_ids, num_beams=int(num_beams),
                                    length_penalty=float(length_penalty), 
                                    max_length=int(max_length),
                                    min_length=int(min_length), 
                                    no_repeat_ngram_size=int(no_repeat_ngram_size),
                                    top_k=50)

    short_summary_txt = shortTokenizer.decode(summary_ids.squeeze(), skip_special_tokens=True,
                                              clean_up_tokenization_spaces=False)
    print('Short summary done', file=sys.stderr)

    text_input_ids = longTokenizer.encode(text, return_tensors='pt', max_length=1024, truncation=True)
    summary_ids = longModel.generate(text_input_ids, num_beams=int(num_beams),
                                    length_penalty=float(length_penalty), 
                                    # max_length=int(max_length)+45,
                                    # min_length=int(min_length)+45, 
                                    no_repeat_ngram_size=int(no_repeat_ngram_size),
                                    top_k=50)

    long_summary_txt = longTokenizer.decode(summary_ids.squeeze(), skip_special_tokens=True,
                                            clean_up_tokenization_spaces=False)
    print('Long summary done', file=sys.stderr)

    return short_summary_txt, long_summary_txt


def main():
    # app.config['TEMPLATES_AUTO_RELOAD'] = True
    # app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    # app.run(debug=True)
    app.run()

if __name__ == '__main__':
    print("Loading BART model and tokenzier . . .")
    main()