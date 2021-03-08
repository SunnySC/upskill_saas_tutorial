class ContactsController < ApplicationController
    def new
      @contact = Contact.new  #The form attributes of name,email and comments saved to variable @contact
    end
    
    def create
      @contact = Contact.new(contact_params)
      if @contact.save
        redirect_to new_contact_path, notice: "Message sent."
      else
        redirect_to new_contact_path, notice: "Error occured"
      end  
    end  
    
    private #Security feature to whitelist the form attributes
      def contact_params
        params.require(:contact).permit(:name, :email, :comments) #White listing of form attributes 
      end  
    
end