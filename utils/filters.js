// currentFilter 상태에 따라 필터 값을 chageFilter()함수에 전달
// 이후 최종 반환
export default (targetElement, { currentFilter }, { changeFilter }) => {
  const newFilters = targetElement.cloneNode(true);

  Array.from(newFilters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }

    a.addEventListener("click", (e) => {
      e.preventDefault();
      changeFilter(a.textContent);
    });
  });

  return newFilters;
};
