import ResultsComponent from '../ResultsComponent';
import * as TextTransformer from '../TextTransformer';

TextTransformer.ordinal_suffix_of = jest.fn(TextTransformer.ordinal_suffix_of);
test("Check if textTransformer is succesfully called by ResultsComponent onMount", () => {
    ResultsComponent({
        results: {
            ranking: 4, 
            results: [],
            score: false
        }
    });
    expect(TextTransformer.ordinal_suffix_of).toHaveBeenCalledWith(4);
    expect(TextTransformer.ordinal_suffix_of).toHaveReturnedWith('4th');
  });