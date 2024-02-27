document.addEventListener(
  "DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveBtn");
    const deleteBtns = document.querySelectorAll("#delete");

    // --------

  // SAVE BUTTON FUNCTIONALITY
  if(saveBtn) {
    saveBtn.addEventListener('click', async () => {
      const id = saveBtn.dataset.id;
      console.log('savBtn ID:', id, typeof id);
    
      const form = document.getElementById('updateMemberForm');
      form.onsubmit = function(e) { e.preventDefault() };
    
      let data = new FormData();
      for (let [name, value] of new FormData(form)) {
        data.append(name, value);
      }
    
      try {
        const response = await fetch(`/api/members/${id}`, {
          method: "PUT",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(Object.fromEntries(data.entries()))
        });
        if (response.ok) {
          window.location.reload(); // reload the page to see changes!
          window.location.href = `/updated/${id}`; // Redirect
        } else {
          console.error('Failed to update member');
        }
      } catch (err) {
        console.error(`Error updating member ${id}`, err);
      }
    });
  }
  
  // DELETE BUTTON FUNCTIONALITY
  if(deleteBtns) {
    deleteBtns.forEach(deleteBtn => {
      // Add event listener to handle delete button clicks
      deleteBtn.addEventListener('click', async() => {
        const id = deleteBtn.dataset.id;
        console.log('delBtn ID:', id, typeof id);

        try {
          const response = await fetch(`/api/members/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            // console.log(await response.json())
            // location.reload(); // Reload the page to remove the deleted item from the table
            window.location.reload(); // reload the page to see changes!
            window.location.href = `/delete/${id}`; // Redirect
          } else {
            console.error(`Failed to delete member  with id: ${id}`);
          }
        } catch (err) {
          console.error(`Error updating member ${id}`, err);
        }
      });
    })
  }

})