export function commentsToTree(comments, parentId = null, level = 0) {
  let result = [];
  comments?.forEach(comment => {
    if ((parentId === null && comment.parent._type === "article") ||
      (comment.parent._id === parentId && comment.parent._type === "comment")) {
      comment.level = level;
      result.push(comment);
      result = result.concat(commentsToTree(comments, comment._id, level + 1));
    }
  });
  return result;
}