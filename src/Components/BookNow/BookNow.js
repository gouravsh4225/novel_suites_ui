import React, { Fragment } from "react";
import NovelDialog from "../../SharedComponents/UI_Elements/NovelDialog/NovelDialog";
import "./BookNow";

const BookNow = ({ isOpen, onClose }) => {
  const onBookNowSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <NovelDialog onEscKeyClose={onClose} isOpen={isOpen}>
        <NovelDialog.Header headerHeading="Book Now" onCloseHandler={onClose} />
        <NovelDialog.Content>
          <div className="book-now-container">
            <section className="book-header">
              <div className="book-direct-logo"></div>
              <div className="book-direct-heading">
                <h3>
                  Incididunt aute deserunt aute sint do Lorem consectetur
                  pariatur ut. Enim proident ex excepteur ea labore incididunt
                  ullamco. Occaecat proident anim eu anim Lorem culpa. Anim
                  mollit ad occaecat qui nostrud laborum sit proident commodo ut
                  nulla anim. Sit cillum velit enim eiusmod nostrud culpa enim
                  id fugiat ullamco nulla. Fugiat cupidatat culpa cupidatat
                  irure pariatur laborum sunt mollit incididunt est. Nostrud
                  anim cillum minim velit sint non. Id irure tempor enim Lorem
                  amet aliquip ullamco eu veniam ex. Magna irure velit minim
                  aliquip anim fugiat laborum enim proident. Minim consectetur
                  non duis dolore nostrud cillum incididunt anim ex et nulla
                  amet. Lorem cupidatat duis reprehenderit velit veniam
                  consectetur ipsum anim magna commodo. Eiusmod ullamco
                  excepteur dolor sint et proident est laborum irure mollit in.
                  Pariatur ipsum qui aliqua elit aute occaecat officia
                  consectetur non enim. Duis nisi aliquip cupidatat id
                  cupidatat. Deserunt enim aliquip enim ullamco non pariatur
                  laboris culpa. Cillum adipisicing ipsum ullamco tempor sunt
                  laborum consequat incididunt qui reprehenderit sunt
                  reprehenderit officia. Esse dolor eiusmod Lorem cupidatat nisi
                  elit culpa pariatur. Sit Lorem ipsum ullamco occaecat amet ea
                  culpa. Irure culpa occaecat elit incididunt in culpa quis
                  consequat pariatur minim dolore. Minim proident ad sit
                  proident ullamco mollit excepteur commodo in laborum qui. Non
                  aliquip commodo ullamco anim nulla incididunt deserunt est
                  adipisicing. Nulla laborum nisi consectetur excepteur laboris
                  ullamco id ex esse. Aliquip laboris laboris elit labore dolor
                  commodo consectetur consequat cupidatat magna ullamco cillum.
                  Eu culpa do deserunt ut laboris proident deserunt. Eu ipsum
                  ipsum consectetur exercitation incididunt nisi. Lorem veniam
                  nisi elit esse cillum culpa exercitation labore ea ut ullamco
                  esse est. Do et est commodo reprehenderit aliqua aliqua.
                  Nostrud elit est nisi pariatur velit elit pariatur adipisicing
                  incididunt ea non. Eu culpa ex consequat labore. Ad consequat
                  duis anim amet consectetur nisi. Excepteur laborum enim sunt
                  enim. Adipisicing eiusmod dolor consequat veniam. Do in
                  consectetur duis magna non consectetur. Mollit ut exercitation
                  eu excepteur ut laborum tempor labore sint ea irure. Sit id
                  aute proident esse. Cillum laboris est ea reprehenderit
                  officia nisi non ad laboris. Dolor excepteur tempor do mollit
                  aliqua officia duis eiusmod amet Lorem cupidatat nulla.
                  Occaecat velit laboris ipsum amet ex tempor aliqua sint
                  adipisicing. Sit consequat ad duis qui. Cupidatat veniam ipsum
                  anim dolore cupidatat et non ipsum exercitation nisi aliqua.
                  Sint exercitation ipsum ex deserunt. Culpa dolor elit cillum
                  aliqua laboris. Nisi deserunt et laboris sint commodo id.
                  Adipisicing veniam nulla enim id pariatur culpa exercitation.
                  Ut adipisicing minim nostrud sunt officia cupidatat ullamco
                  sit veniam. Ad quis nostrud adipisicing quis reprehenderit
                  nostrud laboris dolor in eiusmod sint. Mollit aliquip Lorem
                  enim Lorem sint labore laboris. Ut occaecat velit ea
                  consectetur non labore dolor cillum mollit sint. Sint pariatur
                  eiusmod enim nostrud officia commodo. Dolor irure ut ad
                  laborum amet laborum sunt deserunt eiusmod. Minim et ad eu
                  nulla consectetur tempor consequat aliqua pariatur.
                </h3>
              </div>
            </section>
            <form onSubmit={onBookNowSubmit}></form>
          </div>
        </NovelDialog.Content>
        <NovelDialog.Footer>
          <div>fnksnfkj</div>
        </NovelDialog.Footer>
      </NovelDialog>
    </Fragment>
  );
};

export default BookNow;
