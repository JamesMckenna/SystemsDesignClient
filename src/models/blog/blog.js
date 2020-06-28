import { accessor } from "@/models/helpers/accessor.js";
window._accessor = accessor;

export const Blog = function(
  title,
  author,
  category,
  date,
  description,
  tags,
  content
) {
  function blog(title, author, category, date, description, tags, content) {
    //Currently, the order of the properties has to be in the same order as the incoming args/param list.
    //The constructor in the accessor(handler object) passes to the set function. Set function passes to validator object.
    //If this object's properties are not in same order as args - starting with index base 0 - then validator will throw an error.
    //Validation rules for the _property.
    this.title = {
      type: String,
      value: null, //value: null, || value: Valid || value: undefined
      validator: ["isNotEmpty", "isString", "strLength"],
      regex: "^[a-zA-Z0-9 !@#$%&*~()-_\"':;,.?]*$",
      strLength: [2, 75],
      errMsg: "Title"
    };
    //Validation rules for the _property.
    this.author = {
      type: String,
      value: null,
      validator: ["isNotEmpty", "isString", "strLength"],
      regex: "^[a-zA-Z -]+$",
      strLength: [2, 50],
      errMsg: "Author"
    };
    this.category = {
      type: String,
      value: null,
      validator: ["isNotEmpty", "isString", "strLength"],
      regex: "^[a-zA-Z -]+$",
      strLength: [2, 15],
      errMsg: "Category"
    };
    this.date = {
      type: Date,
      value: null,
      validator: ["isDate"],
      errMsg: "Date"
    };
    this.description = {
      type: String,
      value: null,
      validator: ["isNotEmpty", "isString", "strLength"],
      regex: "^[a-zA-Z0-9 !@#$%&*~()-_\"':;,.?]*$",
      strLength: [2, 100],
      errMsg: "Description"
    };
    this.tags = {
      type: String,
      value: null,
      validator: ["isNotEmpty", "isString", "strLength"],
      regex: "^[a-zA-Z0-9 !@#$%&*~()-_\"':;,.?]*$",
      strLength: [2, 100],
      errMsg: "Tags"
    };
    this.content = {
      type: Array,
      value: null,
      validator: ["isNotEmpty", "isString", "strLength"],
      regex: "^[a-zA-Z0-9 !@#$%&*~()-_\"':;,.?<>/\[\]{}\|]*$",
      strLength: [2, 50000],
      errMsg: "Content"
    };
    //An Object Key/Property that has an Inner Property(ies)
    this._title = {
      //The actual Object Property, Key
      //An Inner Property of an Object's Property
      value: null //The actual Object Property, Key's Value
    };
    this._author = {
      value: null
    };
    this._category = {
      value: null
    };
    this._date = {
      value: null
    };
    this._description = {
      value: null
    };
    this._tags = {
      value: null
    };
    this._content = {
      value: null
    };
  }
  blog.prototype.toString = function toString() {
    return `Title: ${this._title.value}, Author: ${this._author.value}, Category: ${this._category.value}, 
    Date Posted: ${this._date.value}, Description: ${this._description.value}, Tags: ${this._tags.value}, Content: ${this._content.value}`;
  };

  const obj = new Proxy(blog, window._accessor);
  return new obj(title, author, category, date, description, tags, content);
};
