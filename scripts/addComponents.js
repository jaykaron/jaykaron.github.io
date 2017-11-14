var toRender = $("comp");
for(var i=0; i<toRender.length; i++)
  render(toRender[i]);

function render(item){
  var text = []
  if(item.getAttribute("data-text"))
    text = item.getAttribute("data-text").split("|");
  addComponent(item.getAttribute("data-type")+".html", item, text, null);
}

function addComponent(sourceFile, anchor, info, component)
{
  if(!component) {
    loadComponent("../../../components/"+sourceFile, anchor, info);
    return;
  }
  for(var i=0; i<info.length; i++)
    component = component.replace("TEMP",info[i]);
  $("#"+anchor.id).replaceWith(component);
}

function loadComponent(sourceFile, anchor, info){
  $.get(sourceFile, function(data) {
    addComponent(sourceFile, anchor, info, data); 
  }, "html");
}
