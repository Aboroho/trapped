const accordionList = document.querySelectorAll(".accordion");
      accordionList.forEach((accordion) => {
        const accordionHeading = accordion.querySelector(".accordion__heading");
        const accordionBody = accordion.querySelector(".accordion__body");

        accordionHeading.addEventListener("click", (e) => {
          if (accordion.classList.contains("accordion-open")) {
            accordion.classList.remove("accordion-open");
            accordionBody.style.maxHeight = null;
          } else {
            accordion.classList.add("accordion-open");
            accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
          }
        });
      });

      /*=================Modal ================================= */

      const modal = document.querySelector(".modal");
      const modalCloseButton = document.querySelector(".modal__close-button");
      const modalContent = document.querySelector(".modal__content");

      function openModal() {
        modal.style.display = "block";
      }

      function slideUp() {
        openModal();
        modalContent.classList.add("modal-slide-up");
      }

      function slideDown() {
        openModal();
        modalContent.classList.add("modal-slide-down");
      }

      function closeModal() {
        modal.style.display = "none";
        modalContent.classList.remove("modal-slide-up");
        modalContent.classList.remove("modal-slide-down");
      }

      /*================= Slider ================================= */

      function duplicateElement(element, count) {
        const elements = [];

        for (let i = 0; i < count; i++) {
          elements.push(element.cloneNode(true));
        }
        return elements;
      }

      function r_slider() {
        const slider = document.querySelector("#slider");
        const sliderControls = document.querySelector(".slider-controll");
        const sliderNext = document.getElementById("slider-next");
        const sliderPrev = document.getElementById("slider-prev");
        const sliderItems = slider.querySelectorAll(".testimonial");
        if (sliderItems.length === 0) return;

        // creating navigator item
        const sliderNavigator = document.createElement("div");
        sliderNavigator.classList.add("bg-[#C3C3C3]");
        sliderNavigator.innerHTML = ' <div class="slider-nav w-4 h-1.5"></div>';

        let isDown = false;
        let startX;
        let scrollLeft;
        let dragDist = 0;

        const sliderItemGap = 60;
        let sliderItemWidth = sliderItems[0].scrollWidth + sliderItemGap;

        let currentSlide = 0;

        const slideCount = sliderItems.length;

        const sliderNavigators = duplicateElement(sliderNavigator, slideCount);

        sliderNavigators.forEach((nav) => {
          sliderControls.insertBefore(nav, sliderNext);
        });

        window.addEventListener("resize", () => {
          sliderItemWidth = sliderItems[0].scrollWidth + sliderItemGap;
        });
        sliderNext.addEventListener("click", nextSlide);
        sliderPrev.addEventListener("click", prevSlide);
        checkButtonVisibility();

        function updateSliderNavigator() {
          sliderNavigators.forEach((nav, i) => {
            if (i == currentSlide) nav.classList.add("slider-active");
            else nav.classList.remove("slider-active");
          });
        }

        function checkButtonVisibility() {
          if (currentSlide + 1 === slideCount) sliderNext.style.opacity = "0";
          else sliderNext.style.opacity = "1";

          if (currentSlide != 0) sliderPrev.style.opacity = "1";
          else sliderPrev.style.opacity = "0";
          updateSliderNavigator();
        }

        function updateSlidePosition() {
          slider.classList.add("smooth");
          console.log(sliderItemWidth);
          slider.scrollLeft = sliderItemWidth * currentSlide;
          slider.classList.remove("smooth");
        }

        function nextSlide() {
          if (currentSlide == slideCount - 1) return;
          currentSlide++;
          checkButtonVisibility();
          updateSlidePosition();
        }

        function prevSlide() {
          if (currentSlide === 0) return;
          currentSlide--;
          checkButtonVisibility();
          updateSlidePosition();
        }

        const start = (e) => {
          isDown = true;
          slider.classList.add("active");
          startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        };

        const move = (e) => {
          if (!isDown) return;
          const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
          dragDist = x - startX;
          slider.scrollLeft = scrollLeft - dragDist;
          console.log(dragDist);
        };

        const end = (e) => {
          if (dragDist < 0 && dragDist < -50) {
            nextSlide();
          } else if (dragDist > 0 && dragDist > 50) {
            prevSlide();
          } else {
            updateSlidePosition();
          }
        };

        slider.addEventListener("mousedown", start);
        slider.addEventListener("touchstart", start);

        slider.addEventListener("mousemove", move);
        slider.addEventListener("touchmove", move);

        slider.addEventListener("mouseleave", end);
        slider.addEventListener("mouseup", end);
        slider.addEventListener("touchend", end);
      }
      r_slider();

      /*=================*/
      function handleTwoColumn() {
        const twoColumnList = document.querySelectorAll(".two-column");
        if (window.scrollWidth < 1000) return;
        twoColumnList.forEach((list, i) => {
          let col1 = document.createElement("div");
          col1.className = "lg:flex-1 flex flex-col gap-4";
          let col2 = document.createElement("div");
          col2.className = "lg:flex-1 flex flex-col gap-4";
          const children = list.children;
          Array.from(children).forEach((child, i) => {
            if (i % 2 == 0) {
              col1.appendChild(child);
            } else {
              col2.appendChild(child);
            }
          });

          list.appendChild(col1);
          list.appendChild(col2);
        });
      }
      handleTwoColumn();
      // ============animation==============
      function Animation() {
        let vw = window.innerWidth;
        let vh = window.innerHeight;

        let animationQueue = [];

        // helper function
        function slideFromTop(elem, duration) {
          elem.classList.add("slide-from-top");
        }
        function slideFromTopImage(elem, duration) {
          elem.classList.add("slide-from-top-image");
        }

        function slideFromRight(elem, duration) {
          elem.classList.add("slide-from-right");
        }

        function slideFromLeft(elem, duration) {
          elem.classList.add("slide-from-left");
        }
        function slideFromLeftImage(elem, duration) {
          elem.classList.add("slide-from-left-image");
        }
        function slideFromRight(elem, duration) {
          elem.classList.add("slide-from-right");
        }
        function fadeinFromBottom(elem, duration) {
          elem.classList.add("fadein-from-bottom");
        }

        // utility
        function getPositionInViewPort(elem) {
          const rect = elem.getBoundingClientRect();
          const distanceFromViewportTop = rect.top;
          const positionInViewPort = distanceFromViewportTop / vh;
          return positionInViewPort;
        }

        function animate(elem, animateFunction, duration) {
          animateFunction(elem, duration);
          elem.style.animationDuration = `${duration / 1000}s`;
        }

        /*
         * animationArrayelement = [element, animationFunction, duration]
         */
        function groupAnimate(animationArray, options = {}) {
          let delay = 0;
          if (options.delay) {
            const delta = Date.now() - options.time;
            delay = Math.max(0, options.delay - delta);
          }

          let queuedAnimation = [];
          let shouldSkip = false;

          animationArray.forEach(async (animatation, i) => {
            if (shouldSkip) return;
            if (!animatation || animatation.legth < 3) return;
            const element = animatation[0];
            const duration = animatation[2];

            const positionInViewPort = getPositionInViewPort(element);
            // console.log(element, positionInViewPort, vh);
            if (positionInViewPort > 0.9) {
              queuedAnimation = animationArray.slice(i);
              shouldSkip = true;
              return;
            }

            setTimeout(() => animate(...animatation), delay);
            delay += duration;
          });

          if (queuedAnimation.length)
            animationQueue.push({
              animationArray: queuedAnimation,
              options: {
                delay: delay,
                time: Date.now(),
              },
            });
        }

        //================= element ====================
        const subscribeButton = document.querySelector(".subscribe-button");
        const animationElem = document.querySelectorAll(".js-animate");

        //@hero
        const headerImage = document.querySelector(".js-header-image");
        const headerTitle = document.querySelector(".js-header-title");
        const headerText = document.querySelector(".js-header-text");
        const headerButton = document.querySelector(".js-header-button");

        // @testimonial
        const testimonialOne = document.querySelector(".js-testimonial-one");
        const testimonialTwo = document.querySelector(".js-testimonial-two");

        // @awareness
        const awarenessTitle = document.querySelector(".js-awareness-title");
        const awarenessList = document.querySelector(".js-awareness-list");

        // @chapter
        const chapterTitle = document.querySelector(".js-chapter-title");

        // @footer
        const footerImage = document.querySelector(".js-footer-image");
        const footerTitle = document.querySelector(".js-footer-title");
        const footerButton = document.querySelector(".js-footer-button");

        // @ testimonial slider / praises
        const testimonialSlider = document.querySelectorAll(
          ".js-testimonial-slider"
        );
        const praiseTitle = document.querySelector(".js-praise-title");

        // @author
        const authorTitle = document.querySelector(".js-author-title");
        const authorImage = document.querySelector(".js-author-image");
        const authorName = document.querySelector(".js-author-name");
        const authorText = document.querySelector(".js-author-text");
        const authorSocial = document.querySelector(".js-author-social");

        // groupAnimate([]);

        groupAnimate([
          [headerImage, slideFromTopImage, 800],
          [headerTitle, slideFromRight, 600],
          [headerText, fadeinFromBottom, 500],
          [headerButton, fadeinFromBottom, 500],
        ]);

        groupAnimate([[testimonialOne, slideFromLeft, 800]]);
        groupAnimate([[testimonialTwo, slideFromRight, 800]]);

        // groupAnimate([]);

        // awareness list
        const awarenessListAnimationArray = Array.from(
          awarenessList.children
        ).map((list) => {
          list.classList.add("js-animate");
          return [list, fadeinFromBottom, 300];
        });
        awarenessListAnimationArray.unshift([
          awarenessTitle,
          slideFromTop,
          800,
        ]);
        groupAnimate(awarenessListAnimationArray);

        // testimonial
        const testimonialsAnimationArray = Array.from(testimonialSlider).map(
          (slider) => {
            if (vw < 770) return slider.classList.remove("js-animate");
            slider.classList.add("js-animate");
            return [slider, fadeinFromBottom, 500];
          }
        );
        testimonialsAnimationArray.unshift([praiseTitle, slideFromTop, 800]);
        groupAnimate(testimonialsAnimationArray);
        // groupAnimate([]);

        // groupAnimate([]);
        // groupAnimate([]);
        groupAnimate([
          [authorTitle, slideFromTop, 700],
          [authorImage, slideFromLeft, 800],
          [authorName, fadeinFromBottom, 400],
          [authorText, fadeinFromBottom, 400],
          [authorSocial, fadeinFromBottom, 400],
        ]);

        groupAnimate([[chapterTitle, slideFromTop, 800]]);

        // groupAnimate([]);
        groupAnimate([
          [footerImage, slideFromLeft, 800],
          [footerTitle, fadeinFromBottom, 500],
          [footerButton, fadeinFromBottom, 500],
        ]);

        function handleSubscribeButton(pageYOffset) {
          const subscribeButtonRect = subscribeButton.getBoundingClientRect();
          const distanceFromViewportTop = subscribeButtonRect.top;
          const positionInViewPort = distanceFromViewportTop / vh;
          // console.log(distanceFromViewportTop, vh, positionInViewPort);

          if (positionInViewPort < 0.65) {
            animate(subscribeButton, slideFromRight, 600);
          }
        }

        window.addEventListener("resize", () => {
          vw = window.innerWidth;
          vh = window.innerHeight;
        });

        function scrollHandler() {
          let prevPos = window.pageYOffset;

          window.addEventListener("scroll", (e) => {
            // const dist = window.pageYOffset - prevPos;
            // if (dist < 100) return;
            // prevPos = window.pageYOffset;

            const queuedAnimation = [...animationQueue];

            animationQueue = [];
            queuedAnimation.forEach((queueObject) =>
              groupAnimate(queueObject.animationArray, queueObject.options)
            );
          });
        }
        scrollHandler();

        function headLineAnimation() {
          const headLineAnimationContainer = document.querySelector(
            ".js-headline-animation-container"
          );
          const parentwidth = headLineAnimationContainer.scrollWidth;

          function infAnimate() {
            const children = headLineAnimationContainer.children;

            function animateHeadLine() {
              Array.from(children).forEach((child) => {
                // console.log(child.style.left, parseInt(child.style.left));
                child.style.position = "absolute";
                const left = child.style.left ? parseInt(child.style.left) : 0;
                const width = child.scrollWidth;

                const speed = vw > 900 ? 4 : 2;
                const dx = left + speed;
                child.style.left = `${dx}px`;

                if (dx + width > parentwidth && children.length === 1) {
                  const clone = child.cloneNode(true);
                  console.log(Math.min(-1 * width, left - 50));
                  clone.style.left = `${Math.min(
                    -width,
                    left - width - 100
                  )}px`;

                  headLineAnimationContainer.appendChild(clone);
                }

                if (dx > parentwidth) {
                  headLineAnimationContainer.removeChild(child);
                }
              });
            }

            animateHeadLine();

            requestAnimationFrame(infAnimate);
          }
          infAnimate();
        }
        headLineAnimation();
      }
      document.addEventListener("DOMContentLoaded", () => {
        Animation();
      });
