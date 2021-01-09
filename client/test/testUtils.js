/**
 * Return node(s) with given data-test attribute.
 * @param { ShallowWrapper } wrapper - Enzyme Shallow Wrapper.
 * @param { string } value of data-test attribute for search.
 * @returns { ShallowWrapper }
 * 
 */

 export const findByTestAttr = (wrapper, val) => {
     return wrapper.find(`[data-test="${val}"]`);
 }