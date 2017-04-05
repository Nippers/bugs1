let isMouseDown = false
let selector = document.querySelector('.selection')
let container = document.querySelector('.container')
let origin = {
  x: 0,
  y: 0,
}
var thisQQ=[]

let boxes = Array.from(document.querySelectorAll('.box'))

const positionSelector = (e) => {
  const x = e.clientX
  const y = e.clientY
  selector.style.top = y + 'px'
  selector.style.left = x + 'px'
}

const createSelector = (e) => {
  isMouseDown = true
  selector = document.createElement('div')
  selector.classList.add('selection')
  container.appendChild(selector)
  
  origin.x = e.pageX
  origin.y = e.pageY
  positionSelector.call(this, e)
  resizeSelector.call(this, e)
}

const removeSelector = () => {
  origin.x = 0
  origin.y = 0
  container.removeChild(selector)
  isMouseDown = false
}

const removeSelections = () => {
  const selections = Array.from(document.querySelectorAll('.selected'))
  if (selections) {
    selections.map(s => s.classList.remove('selected'))
  }
}

const resizeSelector = (e) => {
  if (!isMouseDown) { return }
  const isLeft = e.clientX < origin.x
  const isUp = e.clientY < origin.y
  
  if (isLeft) {
    selector.style.left = e.clientX + 'px'
    selector.style.width = origin.x - e.clientX + 'px'
  } else {
    selector.style.right = e.clientX + 'px'
    selector.style.width = e.clientX - origin.x + 'px'
  }
  
  if (isUp) {
    selector.style.top = e.clientY + 'px'
    selector.style.height = origin.y - e.clientY + 'px'
  } else {
    selector.style.bottom = e.clientY + 'px'
    selector.style.height = e.clientY - origin.y + 'px'
  }
  
  boxes.map(box => {
    if (!checkOverlap(box, selector)) {
      box.classList.add('selected')
      //if QQ isn't in list, add it
      if(thisQQ.indexOf(box.id)===-1){
        thisQQ.push(box.id);
        //box.classList.add('selected')
      }//else{
        //thisQQ.splice(indexOf(box.id),1);
        //box.classList.remove('selected')
      //}
    } else {
      box.classList.remove('selected');
      //if QQ is in list, remove it
      //thisQQ.splice(indexOf(box.id),1);
      //document.getElementById('list').innerHTML=box.id
    }
    //thisQQ.splice(indexOf(box.id),1);
    document.getElementById('list').innerHTML=thisQQ;
  })
}

  const checkOverlap = (box, selection) => {
  const a = box.getBoundingClientRect()
  const b = selection.getBoundingClientRect()
  
  return (
    (b.right <= a.left) || (b.left >= a.right) || (b.bottom <= a.top) || (b.top >= a.bottom)
  )
  
}

/*
for(i=0;i<boxes.length;i++){
  if(boxes[i].classList!=='selected'){
    if(indexOf(boxes[i].id)>-1){
      thisQQ.splice(indexOf(boxes[i].id),1);
      document.getElementById('list').innerHTML=thisQQ;
    }
  }
}
*/

  function clearQQs(){
    thisQQ=[];
    document.getElementById("list").innerHTML="Quarter-Quarters";
    for(i=0;i<boxes.length;i++){
      boxes[i].classList.remove('selected');
    }
}
  
  
  
  
  
  
  
  
container.addEventListener('mousedown', createSelector)
document.addEventListener('mouseup', removeSelector)
container.addEventListener('mousemove', resizeSelector)
                           
