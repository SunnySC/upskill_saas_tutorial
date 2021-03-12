class ContactsController < ApplicationController
    def new
      @contact = Contact.new  #The form attributes of name,email and comments saved to variable @contact
    end
    
    def create
      @contact = Contact.new(contact_params)   #paramas specifies mass assignment
      if @contact.save
        name = params[:contact][:name]
        email = params[:contact][:email]
        body = params[:contact][:comments]
        ContactMailer.contact_email (name, email, body).deliver
        flash[:success] = "Message Sent"
        redirect_to new_contact_path
      else
        flash[:danger] = @contact.errors.full_messages.join(" , ")
        redirect_to new_contact_path
      end  
    end  
    
    private #Security feature to whitelist the form attributes
      def contact_params
        params.require(:contact).permit(:name, :email, :comments) #White listing of form attributes and called mass assignment 
      end  
    
end