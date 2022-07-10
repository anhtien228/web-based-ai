from transformers import BartTokenizer, BartForConditionalGeneration
import sys

# shortTokenizer = BartTokenizer.from_pretrained('./ml/distilbart-xsum-12-6/', local_files_only=True)
# shortModel = BartForConditionalGeneration.from_pretrained('./ml/distilbart-xsum-12-6/', local_files_only=True)

# longTokenizer = BartTokenizer.from_pretrained('./ml/distilbart-cnn-12-6/', local_files_only=True)
# longModel = BartForConditionalGeneration.from_pretrained('./ml/distilbart-cnn-12-6/', local_files_only=True)

shortTokenizer = BartTokenizer.from_pretrained('sshleifer/distilbart-xsum-12-6')
shortModel = BartForConditionalGeneration.from_pretrained('sshleifer/distilbart-xsum-12-6')

longTokenizer = BartTokenizer.from_pretrained('datien228/distilbart-cnn-12-6-ftn-multi_news')
longModel = BartForConditionalGeneration.from_pretrained('datien228/distilbart-cnn-12-6-ftn-multi_news')


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