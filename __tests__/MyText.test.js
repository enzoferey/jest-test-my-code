import React from "react";
import renderer from "react-test-renderer";

const MyText = global.MyText;

test("snapshot matches", () => {
  const tree = renderer.create(<MyText name="Enzo" />).toJSON();
  expect(tree).toMatchSnapshot();
});
