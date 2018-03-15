module.exports = `html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
}

.app-name {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  color: #09383E;
  top: 15px;
  left: 15px;
}

.container__item {
  margin: 0 auto;
}

.landing-page-container {
  width: 100%;
  min-height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
  color: #09383E;
}

.content__wrapper {
  max-width: 1200px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

.greeting {
  position: absolute;
  top: 16.6rem;
  left: 6rem;
  right: 0;
  margin: 0 auto;
  text-transform: uppercase;
  letter-spacing: 4rem;
  font-size: 2.2rem;
  font-weight: 400;
  opacity: 0.5;
}

.greeting::after{
  content: '';
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  display: inline-block;
  background-color: #0C383E;
  position: relative;
  top: -0.65rem;
  left: -5.05rem;
}

.ellipses-container {
  width: 50rem;
  height: 50rem;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  top: 4em;
  left: 10em;
}

.ellipses {
  border-radius: 50%;
  position: absolute;
  top: 0;
  border-style: solid;
}

.ellipses__outer--thin {
  width: 70%;
  height: 70%;
  border-width: 1px;
  border-color: rgba(9, 56, 62, 0.1);
  animation: ellipsesOrbit 15s ease-in-out infinite;
}

.ellipses__outer--thin::after {
  content: "";
  background-image: url('https://s29.postimg.org/5h0r4ftkn/ellipses_dial.png');
  background-repeat: no-repeat;
  background-position: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  opacity: 0.15;
}

.ellipses__outer--thick {
  width: 69.5%;
  height: 69.5%;
  border-color: #09383E transparent;
  border-width: 2px;
  transform: rotate(-45deg);
  animation: ellipsesRotate 15s ease-in-out infinite;
}

.ellipses__orbit {
  width: 2.5rem;
  height: 2.5rem;
  border-width: 2px;
  border-color: #09383E;
  top: 1.3rem;
  right: 6.75rem;
}

.ellipses__orbit::before {
  content: '';
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  display: inline-block;
  background-color: #09383E;
  margin: 0 auto;
  left: 0;
  right: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

}


@keyframes ellipsesRotate {
    0% {
        transform: rotate(-45deg);
    }

    100% {
        transform: rotate(-405deg);
    }
}

@keyframes ellipsesOrbit {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
`
