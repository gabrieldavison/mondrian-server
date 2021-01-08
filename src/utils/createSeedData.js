const db = require("../models/index");

const boxContent = `
# This is a box

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet purus et malesuada vehicula. Maecenas ullamcorper, enim vel ornare pretium, sapien ligula lacinia justo, et molestie ante quam at risus.

Phasellus at quam vel est aliquam hendrerit. Suspendisse non lacus pellentesque, semper dui vitae, finibus libero. Donec congue maximus commodo. Fusce porttitor luctus ultrices. Curabitur tempus lacus eu vestibulum posuere. Integer tincidunt, arcu vel rutrum elementum, orci nunc dignissim diam, efficitur viverra risus neque ac massa. Donec aliquet sagittis tempor.
`;

const createSeedData = async () => {
  // Creates pages

  const page1 = await db.Page.create({
    name: "page1",
  });

  const page2 = await db.Page.create({
    name: "page2",
  });

  //Creates page1 boxes

  const box1 = await db.Box.create({
    content: boxContent,
    position: 1,
    PageId: 1,
  });
  const box2 = await db.Box.create({
    content: boxContent,
    position: 2,
    PageId: 1,
  });
  const box3 = await db.Box.create({
    content: boxContent,
    position: 3,
    PageId: 1,
  });

  // Creates page 2 boxes

  const box4 = await db.Box.create({
    content: boxContent,
    position: 1,
    PageId: 2,
  });
  const box5 = await db.Box.create({
    content: boxContent,
    position: 2,
    PageId: 2,
  });
  const box6 = await db.Box.create({
    content: boxContent,
    position: 3,
    PageId: 2,
  });
};

export default createSeedData;
